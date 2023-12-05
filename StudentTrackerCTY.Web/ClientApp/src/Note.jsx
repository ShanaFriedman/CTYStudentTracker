
const Note = () => {
    return <><div className="row">
    <div className="col-md-8 card card-body bg-light">
        <div className="mt-1">{n.text}</div>
        <div className="offset-11"><button className="btn btn-danger" onClick={() => onDeleteNoteClick(n)}>Delete</button></div>
    </div>
</div></>
}