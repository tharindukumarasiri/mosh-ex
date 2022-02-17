
export function paginate(items, pageNumber, pageSize){
    const pageStartingIndex = (pageNumber - 1) * pageSize
    return items.slice(pageStartingIndex, pageStartingIndex + pageSize)
}