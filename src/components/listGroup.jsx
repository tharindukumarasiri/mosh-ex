export default function ListGroup({items, selectedItemId, onSelectItem, nameProperty, idProperty}) {

    const getButtonClassName = (itemId) => {
        if(itemId === selectedItemId){
            return "list-group-item list-group-item-action active"
        } else {
            return "list-group-item list-group-item-action"
        }
    }

    return (
        <div className="list-group">
            { items.map( item => {
                return <button type="button" className={getButtonClassName(item[idProperty])} key={item[idProperty]} onClick={()=>{onSelectItem(item[idProperty])}}>{item[nameProperty]}</button>
            })

            }
        </div>
    )
}

ListGroup.defaultProps = {
    nameProperty: "name",
    idProperty: "_id"
}