import React from 'react';
import {getQuickSortAnimations, getMergeSortAnimations, getHeapSortAnimations, getBubbleSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

const ANIMATION_SPEED_MS = 5;
const NUMBER_OF_ARRAY_BARS = 160;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            array: []
        }
    }

    componentDidMount()
    {
        this.buildArray();
    }

    buildArray()
    {
        const array = [];

        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; ++i)
            array.push(randomFromInterval(5, 500));

        this.setState({array});
    }

    render()
    {
        const {array} = this.state;

        return (
            <div className='array-container'>
                {array.map((value, idx) => (
                    <div className='array-bar'
                        key={idx}
                        style=
                        {{
                            backgroundColor: PRIMARY_COLOR,
                            height: `${value}px`,
                        }}>
                    </div>
                ))}

                <div className='buttons'>
                    <button onClick={() => this.buildArray()}>Generate a New Array</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.heapSort()}>Heap Sort</button>
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                </div>

                <p id='footer'>&copy; Sorting Visualizer created by <a href='https://github.com/nikolatechie'>Nikola Grujic</a></p>
            </div>
        )
    }

    quickSort()
    {
        const animations = getQuickSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; ++i)
        {
            const arrayBars = document.getElementsByClassName('array-bar');
            const changingColor = (i % 4 < 2);

            if (changingColor)
            {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = (i % 2 == 0) ? SECONDARY_COLOR:PRIMARY_COLOR;

                setTimeout(() =>
                {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i*ANIMATION_SPEED_MS*1.6);
            }
            else
            {
                setTimeout(() =>
                {
                    const [currentBar, newHeight] = animations[i];
                    const currentBarStyle = arrayBars[currentBar].style;
                    currentBarStyle.height = `${newHeight}px`;
                }, i*ANIMATION_SPEED_MS*1.6);
            }
        }
    }

    mergeSort()
    {
        const animations = getMergeSortAnimations(this.state.array);
        
        for (let i = 0; i < animations.length; ++i)
        {
            const arrayBars = document.getElementsByClassName('array-bar');
            const changingColor = (i % 3 != 2);

            if (changingColor)
            {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = (i % 3 == 0) ? SECONDARY_COLOR : PRIMARY_COLOR;

                setTimeout(() =>
                {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i*ANIMATION_SPEED_MS*2);
            }
            else
            {
                setTimeout(() =>
                {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i*ANIMATION_SPEED_MS*2);
            }
        }
    }

    heapSort()
    {
        const animations = getHeapSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; ++i)
        {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [event1, event2, changingColor, colorType] = animations[i];

            if (changingColor)
            {
                setTimeout(() =>
                {
                    const color = (colorType) ? PRIMARY_COLOR:SECONDARY_COLOR;
                    const barOneStyle = arrayBars[event1].style;
                    const barTwoStyle = arrayBars[event2].style;
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i*ANIMATION_SPEED_MS*1.2);
            }
            else
            {
                setTimeout(() =>
                {
                    const barStyle = arrayBars[event1].style;
                    barStyle.height = `${event2}px`;
                }, i*ANIMATION_SPEED_MS*1.2);
            }
        }
    }

    bubbleSort()
    {
        const animations = getBubbleSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; ++i)
        {
            const arrayBars = document.getElementsByClassName('array-bar');
            const changingColor = (i % 4 < 2);

            if (changingColor)
            {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = (i % 4 == 0) ? SECONDARY_COLOR:PRIMARY_COLOR;

                setTimeout(() =>
                {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i*ANIMATION_SPEED_MS/1.5);
            }
            else
            {
                const [currentBar, newHeight] = animations[i];
                const currentBarStyle = arrayBars[currentBar].style;

                setTimeout(() =>
                {
                    currentBarStyle.height = `${newHeight}px`;
                }, i*ANIMATION_SPEED_MS/1.5);
            }
        }
    }
}

function randomFromInterval(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}