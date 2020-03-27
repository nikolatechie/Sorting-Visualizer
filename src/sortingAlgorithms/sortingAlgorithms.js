export function getQuickSortAnimations(array)
{
    const animations = [];
    quickSortHelper(array, 0, array.length-1, animations);
    return animations;
}

function quickSortHelper(array, startIdx, endIdx, animations)
{
    if (startIdx < endIdx)
    {
        const i = quickSortPartition(array, startIdx, endIdx, animations);
        quickSortHelper(array, startIdx, i-1, animations);
        quickSortHelper(array, i+1, endIdx, animations);
    }
}

function quickSortPartition(array, startIdx, endIdx, animations)
{
    let i = startIdx;

    for (let j = startIdx; j < endIdx; ++j)
    {
        animations.push([j, endIdx]);
        animations.push([j, endIdx]);

        if (array[j] <= array[endIdx])
        {
            const tmp = array[i];
            array[i] = array[j];
            array[j] = tmp;
            animations.push([i, array[i]]);
            ++i;
        }
        else animations.push([i, array[i]]);

        animations.push([j, array[j]]);
    }

    animations.push([i, endIdx]);
    animations.push([i, endIdx]);
    const tmp = array[i];
    array[i] = array[endIdx];
    array[endIdx] = tmp;
    animations.push([i, array[i]]);
    animations.push([endIdx, array[endIdx]]);

    return i;
}

export function getMergeSortAnimations(array)
{
    const animations = [];
    const auxArray = array.slice();
    mergeSortHelper(array, 0, array.length-1, auxArray, animations);
    return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxArray, animations)
{
    if (startIdx == endIdx) return;
    const midIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxArray, startIdx, midIdx, mainArray, animations);
    mergeSortHelper(auxArray, midIdx+1, endIdx, mainArray, animations);
    mergeSort(mainArray, startIdx, midIdx, endIdx, auxArray, animations);
}

function mergeSort(mainArray, startIdx, midIdx, endIdx, auxArray, animations)
{
    let k = startIdx, i = startIdx, j = midIdx+1;

    while (i <= midIdx && j <= endIdx)
    {
        animations.push([i, j]);
        animations.push([i, j]);

        if (auxArray[i] <= auxArray[j])
        {
            animations.push([k, auxArray[i]]);
            mainArray[k++] = auxArray[i++];
        }
        else
        {
            animations.push([k, auxArray[j]]);
            mainArray[k++] = auxArray[j++];
        }
    }

    while (i <= midIdx)
    {
        animations.push([i, i]);
        animations.push([i, i]);    
        animations.push([k, auxArray[i]]);
        mainArray[k++] = auxArray[i++];
    }

    while (j <= endIdx)
    {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxArray[j]]);
        mainArray[k++] = auxArray[j++];
    }
}

export function getHeapSortAnimations(array)
{
    const animations = [];

    for (let i = (array.length/2)-1; i >= 0; --i)
        maxHeapify(array, i, array.length, animations);

    for (let i = array.length-1; i > 0; --i)
    {
        const tmp = array[0];
        array[0] = array[i];
        array[i] = tmp;
        animations.push([0, array[0], false, false]);
        animations.push([i, array[i], false, false]);
        maxHeapify(array, 0, i, animations);
    }

    return animations;
}

function maxHeapify(array, startIdx, endIdx, animations)
{
    const leftChild = (startIdx*2)+1;
    const rightChild = leftChild+1;
    let larger = startIdx;

    if (leftChild < endIdx && array[leftChild] > array[startIdx])
    {
        animations.push([leftChild, startIdx, true, false]);
        animations.push([leftChild, startIdx, true, true]);
        larger = leftChild;
    }

    if (rightChild < endIdx && array[rightChild] > array[larger])
    {
        animations.push([rightChild, larger, true, false]);
        animations.push([rightChild, larger, true, true]);
        larger = rightChild;
    }

    animations.push([larger, startIdx, true, false]);
    animations.push([larger, startIdx, true, true]);

    if (larger != startIdx)
    {
        const tmp = array[startIdx];
        array[startIdx] = array[larger];
        array[larger] = tmp;
        animations.push([startIdx, array[startIdx], false, false]);
        animations.push([larger, array[larger], false, false]);
        maxHeapify(array, larger, endIdx, animations);
    }
}

export function getBubbleSortAnimations(array)
{
    const animations = [];

    for (let pass = 0; pass < array.length-1; ++pass)
    {
        for (let i = 0; i < array.length-1-pass; ++i)
        {
            const j = i+1;
            animations.push([i, j]);
            animations.push([i, j]);

            if (array[i] > array[j])
            {
                const tmp = array[i];
                array[i] = array[j];
                array[j] = tmp;
            }
            
            animations.push([i, array[i]]);
            animations.push([j, array[j]]);
        }
    }

    return animations;
}