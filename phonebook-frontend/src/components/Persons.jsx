import Person from './Person'

const Persons = (props) => {
    const {persons, deleteAction} = props
  
    return(
        <>
            {persons.map(person => <Person key={person.id} person={person} deleteAction={() => deleteAction(person)} />)}
        </>
    )
}

export default Persons