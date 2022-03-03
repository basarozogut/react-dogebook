import { useEffect, useState } from "react";
import api from "../api/api";
import { Button, Card, Col, Row } from "react-bootstrap";

export default function DogGallery(props) {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);

    const imagesPerPage = 10;

    useEffect(() => {
        if (props.breed) {
            api.get(`breed/${props.breed}/images`)
                .then(res => {
                    setImages(res.data.message);
                });
        }
    }, [props.breed]);

    function handleLoadMoreClick() {
        setPage(prev => prev + 1);
    }

    function areThereMorePagesToLoad() {
        const numberOfImagesDisplayed = imagesPerPage * page;
        return numberOfImagesDisplayed < images.length;
    }

    let gallery = null;
    if (images.length > 0) {
        gallery = images.slice(0, imagesPerPage * page).map(url => (
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
        <div>
            <h3>{props.breed}</h3>
            <Row xs={1} md={2} className="g-4 mb-3">
                {gallery}
            </Row>
            {areThereMorePagesToLoad() &&
                <div className="text-center">
                    <Button variant="primary" onClick={handleLoadMoreClick}>Load More</Button>
                </div>
            }
        </div>
    );
}