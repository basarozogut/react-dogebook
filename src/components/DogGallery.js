import { useEffect, useState } from "react";
import api from "../api/api";
import { Card, Col, Row } from "react-bootstrap";

export default function DogGallery(props) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (props.breed) {
            api.get(`breed/${props.breed}/images`)
                .then(res => {
                    setImages(res.data.message);
                });
        }
    }, [props.breed]);

    let gallery = null;
    if (images.length > 0) {
        gallery = images.slice(0, 10).map(url => (
            <Col key={url}>
                <Card>
                    <Card.Img variant="top" src={url} />
                    <Card.Body>
                        <Card.Title>{url}</Card.Title>
                    </Card.Body>
                </Card>
            </Col>
        ));
    }

    return (
        <Row xs={1} md={2} className="g-4">
            {gallery}
        </Row>
    );
}