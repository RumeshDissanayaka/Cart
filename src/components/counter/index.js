import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

const DEFAULT_SHIRT_PRICE = 150;
const DEFAULT_BAG_PRICE = 250;
const DEFAULT_PRICE_UNIT = 1;
const DEFAULT_QUANTITY = 0;

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
  },
  table: {
    maxWidth: 300
  }
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const createData = (item, price) => {
  return { item, price };
};

const rows = [
  createData("T-Shirt", DEFAULT_SHIRT_PRICE),
  createData("BAG", DEFAULT_BAG_PRICE)
];

const Counter = () => {
  const classes = useStyles();
  const [shirtPriceUnit, setShirtPriceUnit] = useState(DEFAULT_PRICE_UNIT);
  const [bagPriceUnit, setBagPriceUnit] = useState(DEFAULT_PRICE_UNIT);

  const [shirtPrice, setShirtPrice] = useState(DEFAULT_SHIRT_PRICE);
  const [bagPrice, setBagPrice] = useState(DEFAULT_BAG_PRICE);
  const [shirtQuantity, setShirtQuantity] = useState(DEFAULT_QUANTITY);
  const [bagQuantity, setBagQuantity] = useState(DEFAULT_QUANTITY);
  const [isShirtAddToCartClick, setIsShirtAddToCartClick] = useState(false);
  const [isBagAddToCartClick, setIsBagAddToCartClick] = useState(false);

  //Sample get call
  const sendGetRequest = async () => {
    try {
      const resp = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      console.log(resp.data);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  //Sample post call
  const sendPostRequest = async () => {
    try {
      const resp = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          userId: 1,
          title: "A new post",
          body: "This is the body of the new post"
        }
      );
      console.log(resp.data);
    } catch (err) {
      console.error(err);
    }
  };

  const shirtPriceUnitHandleChange = event => {
    setShirtPriceUnit(event.target.value);
  };

  const bagPriceUnitHandleChange = event => {
    setBagPriceUnit(event.target.value);
  };

  const shirtQuantityHandler = type => {
    switch (type) {
      case "plus":
        //API CALL
        setShirtQuantity(shirtQuantity + 1);
        break;
      case "minus":
        //API CALL
        setShirtQuantity(shirtQuantity - 1);
        break;
      default:
        break;
    }
  };

  const bagsQuantityHandler = type => {
    switch (type) {
      case "plus":
        //API CALL
        setBagQuantity(bagQuantity + 1);
        break;
      case "minus":
        //API CALL
        setBagQuantity(bagQuantity - 1);
        break;
      default:
        break;
    }
  };

  const cartHandler = type => {
    //API CALL FOR TOTAL PRICE
    //After api call success call switch case
    switch (type) {
      case "shirt":
        setIsShirtAddToCartClick(shirtQuantity === 0 ? false : true);
        setShirtPrice(shirtQuantity * DEFAULT_SHIRT_PRICE * shirtPriceUnit);
        break;
      case "bag":
        setIsBagAddToCartClick(bagQuantity === 0 ? false : true);
        setBagPrice(bagQuantity * DEFAULT_BAG_PRICE * bagPriceUnit);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Typography component={"div"} variant={"h3"}>
        {"Price Engine"}
      </Typography>

      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid item xs={4}>
          <FormControl variant="filled" className={classes.formControl}>
            <Select
              value={shirtPriceUnit}
              onChange={shirtPriceUnitHandleChange}
            >
              <MenuItem value={1}>{"Units"}</MenuItem>
              <MenuItem value={12}>{"Cartoon"}</MenuItem>
            </Select>
          </FormControl>
          <Typography component={"div"} variant={"h6"} color={"primary"}>
            {"T-Shirt"}
          </Typography>
          <Box
            component={"div"}
            display={"flex"}
            style={{ justifyContent: "center" }}
          >
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              disabled={shirtQuantity === 0}
              onClick={() => shirtQuantityHandler("minus")}
            >
              <RemoveIcon />
            </IconButton>
            <span style={{ display: "inline-block", width: 5 }} />
            <IconButton
              aria-label="upload picture"
              component="span"
              onClick={() => shirtQuantityHandler("plus")}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => cartHandler("shirt")}
            endIcon={<AddShoppingCartIcon />}
          >
            {"Add to cart"}
          </Button>

          <Typography
            component={"div"}
            variant={"h6"}
            color={"primary"}
            style={{ marginTop: 10 }}
          >
            {"No of T-Shirt"} {shirtQuantity}
          </Typography>
          <Typography
            component={"div"}
            variant={"h6"}
            color={"primary"}
            style={{ marginTop: 10 }}
          >
            {"T-Shirt price LKR"}{" "}
            {shirtQuantity * DEFAULT_SHIRT_PRICE * shirtPriceUnit}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <FormControl variant="filled" className={classes.formControl}>
            <Select value={bagPriceUnit} onChange={bagPriceUnitHandleChange}>
              <MenuItem value={1}>{"Units"}</MenuItem>
              <MenuItem value={12}>{"Cartoon"}</MenuItem>
            </Select>
          </FormControl>
          <Typography component={"div"} variant={"h6"} color={"primary"}>
            {"Bags"}
          </Typography>
          <Box
            component={"div"}
            display={"flex"}
            style={{ justifyContent: "center" }}
          >
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              disabled={bagQuantity === 0}
              onClick={() => bagsQuantityHandler("minus")}
            >
              <RemoveIcon />
            </IconButton>
            <span style={{ display: "inline-block", width: 5 }} />
            <IconButton
              aria-label="upload picture"
              component="span"
              onClick={() => bagsQuantityHandler("plus")}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => cartHandler("bag")}
            endIcon={<AddShoppingCartIcon />}
          >
            {"Add to cart"}
          </Button>
          <Typography
            component={"div"}
            variant={"h6"}
            color={"primary"}
            style={{ marginTop: 10 }}
          >
            {"No bags"} {bagQuantity}
          </Typography>

          <Typography
            component={"div"}
            variant={"h6"}
            color={"primary"}
            style={{ marginTop: 10 }}
          >
            {"Bags price LKR"} {bagQuantity * DEFAULT_BAG_PRICE * bagPriceUnit}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography
            component={"div"}
            variant={"h6"}
            style={{ color: "#7CFC00" }}
          >
            {"My Cart"}
          </Typography>

          {isShirtAddToCartClick && shirtQuantity !== 0 && (
            <>
              <Box component={"div"}>
                <Typography component={"div"} variant={"h6"} color={"primary"}>
                  {"T-Shirt price (lkr) :"} {shirtPrice}
                </Typography>
              </Box>
            </>
          )}

          {isBagAddToCartClick && bagQuantity !== 0 && (
            <>
              <Typography component={"div"} variant={"h6"} color={"primary"}>
                {"TBags(lkr) :"} {bagPrice}
              </Typography>
            </>
          )}
        </Grid>

        <Box component={"div"} style={{ padding: "20px 50px" }}>
          {" "}
          <Typography component={"div"} variant={"h6"}>
            {"Items values"}
          </Typography>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>{"Item"}</StyledTableCell>
                  <StyledTableCell align="right">
                    {"Price(LKR)"}
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <StyledTableRow key={row.item}>
                    <StyledTableCell component="th" scope="row">
                      {row.item}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.price}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    </div>
  );
};

export default Counter;
