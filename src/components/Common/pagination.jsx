import React from 'react'
import _ from "lodash"


export default function Pagination({ items, pageSize, pageNumber, onChangePage }) {
    const pageCount = Math.ceil(items.length / pageSize)
    const pageNumberList = _.range(1, pageCount + 1)
    const getPageNumbers = () => {


        return pageNumberList.map((pgNumber) => {
            return (
                <li className={pageNumber === pgNumber ? "page-item active" : "page-item"} style={{ cursor: 'pointer' }} key={pgNumber}
                    onClick={() => { onChangePage(pgNumber) }}><a className="page-link">{pgNumber}</a></li>
            )
        })
    }

    if (pageNumberList.length === 1) return null

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item" style={{ cursor: 'pointer' }} onClick={() => { if(pageNumber !== 1) onChangePage(pageNumber - 1) }}><a className="page-link">Previous</a></li>
                {getPageNumbers()}
                <li className="page-item" style={{ cursor: 'pointer' }} onClick={() => { if(pageNumber !== pageNumberList.at(-1)) onChangePage(pageNumber + 1) }}><a className="page-link" >Next</a></li>
            </ul>
        </nav>
    )
}