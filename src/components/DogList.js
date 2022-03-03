import { ListGroup } from "react-bootstrap";

export default function DogList(props) {
    let loading = null;
    if (props.loading) {
        loading = <p>Please wait while doges are loaded...</p>
    }

    return (
        <div>
            {loading}
            {props.dogs.length > 0 &&
                <ListGroup>
                    {props.dogs.map((dog) =>
                        <ListGroup.Item key={dog} action onClick={() => props.onDogSelected(dog)}>
                            {dog}
                        </ListGroup.Item>
                    )}
                </ListGroup>
            }
        </div>
    );
}