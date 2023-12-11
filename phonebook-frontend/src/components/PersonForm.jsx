const PersonForm = (props) => {
    const {onAdd} = props
  
    return(
    <form onSubmit={onAdd}>
      <div>
        name: <input value={props.nameValue} onChange={props.nameChange} />
      </div>
      <div>
        number: <input value={props.numberValue} onChange={props.numberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    )
}

export default PersonForm