export default function ListGroup({items, selectedItemId, onSelectItem}) {

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
                return <button type="button" className={getButtonClassName(item._id)} key={item._id} onClick={()=>{onSelectItem(item._id)}}>{item.name}</button>
            })

            }
        </div>
    )
}