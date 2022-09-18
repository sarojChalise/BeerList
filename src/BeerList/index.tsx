/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import LoadingSpinner from "../Components/Spinner";

import getData from "../utils/api";
import getText from "../utils/getTextFromArray";

interface ListBeer {
  name: string;
  tagline: string;
  image_url: string;
  description: string;
  ingredients: {
    hops: object[];
    malt: object[];
    yeast: string;
  };
}

const BeerList = () => {
  const [beerList, setBeerList] = useState<ListBeer[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getBeerList(1, 10);
  }, []);

  useEffect(() => {
    if (beerList?.length > 0) {
      setLoading(false);
    }
  }, [beerList]);

  const getBeerList = async (page: number, perPage: number) => {
    const response = await getData(
      `https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`
    );
    if (response?.length > 0) {
      setBeerList([...beerList, ...response]);
    }
  };

  const loadMore = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setPage(page + 1);
    getBeerList(page + 1, 10);
  };
  return (
    <Container>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="title">
            <h4>Beers</h4>
            <hr />
          </div>
          <Row className="justify-content-md-center">
            {beerList?.map((each: any) => (
              <Col className="list-item" sm={8} md={7} lg={5} key={each.id}>
                <Card className="shadow-sm bg-white">
                  <div className="card-horizontal">
                    <div className="image-container">
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip>
                            <span>Ingredients</span>
                            <br />
                            <span className="tooltip-content">
                              <strong>Malt:</strong>
                              {getText(each?.ingredients?.malt, "name")}
                              <br />
                              <strong>Hops:</strong>
                              {getText(each?.ingredients?.hops, "name")} <br />
                              <strong>Yeast:</strong> {each?.ingredients?.yeast}
                            </span>
                          </Tooltip>
                        }
                      >
                        <Image className="beer-image" src={each.image_url} />
                      </OverlayTrigger>
                    </div>
                    <Card.Body>
                      <h4 className="card-title">{each.name}</h4>
                      <p className="tags"> {each.tagline}</p>
                      <p className="card-text">
                        {each.description?.slice(0, 100).concat("...")}
                      </p>
                    </Card.Body>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <Row className="justify-content-md-center">
            <Col>
              <span className="load-more" onClick={loadMore}>
                Load More <i className="arrow down" />
              </span>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default BeerList;
