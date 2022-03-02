import { ListGroup } from "react-bootstrap";

export default function DogList(props) {
    return (
        <div>
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