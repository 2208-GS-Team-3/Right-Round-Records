import React from "react";
import { Container } from "@mui/system";
import { Button, Typography, FormControl, FormLabel } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const containerStyles = {
  border: "1px solid black",
  borderRadius: "5px",
  margin: "20px",
  padding: "20px",
  display: "flex",
  justifyContent: "space-between",
};

const CheckoutPage = () => {
  return (
    <>
      <Container>
        <Typography sx={{ ml: 1 }} variant="h4">
          Check out (# items)
        </Typography>
        <Container sx={{ ml: 1 }} style={containerStyles}>
          <Typography sx={{ ml: 1 }} variant="h5">
            Shipping Address
          </Typography>
          <Typography sx={{ ml: 1 }} variant="h6">
            Address HERE
          </Typography>
          <Button>Change</Button>
        </Container>

        <Container style={containerStyles}>
          <Typography sx={{ ml: 1 }} variant="h5">
            Payment Method
          </Typography>
          <Typography sx={{ ml: 1 }} variant="h6">
            Payment Options here{" "}
          </Typography>
          <Button>Change</Button>
        </Container>

        <Container style={containerStyles}>
          <Typography sx={{ ml: 1 }} variant="h4">
            Review items and shipping{" "}
          </Typography>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Choose a delivery option:
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="3days"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="overnight"
                control={<Radio />}
                label="overnight"
              />
              <FormControlLabel
                value="3days"
                control={<Radio />}
                label="3days"
              />
              <FormControlLabel
                value="5days"
                control={<Radio />}
                label="5days"
              />
            </RadioGroup>
          </FormControl>
        </Container>

        <Container style={containerStyles}>
          <Typography sx={{ ml: 1 }} variant="h4">
            Order Total:{" "}
          </Typography>
          <Button>Place your order</Button>
        </Container>
      </Container>
    </>
  );
};

export default CheckoutPage;
