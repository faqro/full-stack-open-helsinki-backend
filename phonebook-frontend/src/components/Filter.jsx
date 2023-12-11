const Filter = (props) => {
    const {onFilter} = props
  
    return(
    <div>
      filter: <input onChange={onFilter} />
    </div>
    )
}

export default Filter