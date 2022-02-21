export default function SortIcon({ header, sort, onClick }) {

    let iconClass = "fa fa-caret-up clickale"
    if (sort.order === "asc") iconClass = "fa fa-caret-down clickale"

    if (sort.sortBy !== header) return null

    return (
        <i className={iconClass} onClick={(c) => { onClick(c) }}></i>
    )

}

SortIcon.defaultProps = {
    onClick: () => {}
}
