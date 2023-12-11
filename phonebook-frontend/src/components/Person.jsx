const Person = (props) => {
    const {person, deleteAction} = props
  
    return(
        <>
            <p>{person.name} {person.number}<button onClick={deleteAction}>Delete</button></p>
        </>
    )
}

export default Person