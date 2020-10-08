import React from "react";
import "./App.css";
import { Card, Row, Col, Layout, Typography, Button } from "antd";
const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;

const CHECKBOARD_SIZE = 4;

function emptyCheckBoard() {
  let checkBoard = [];
  for (let y = 0; y < CHECKBOARD_SIZE; y++) {
    let blocks = [];
    for (let x = 0; x < CHECKBOARD_SIZE; x++) {
      blocks.push(0);
    }
    checkBoard.push(blocks);
  }
  return checkBoard;
}

function App() {
  return (
    <div className="App">
      <Layout className="layout">
        <Header></Header>
        <Content>
          <Row justify={"center"}>
            <Game className={"CheckBoard"}></Game>
          </Row>
        </Content>
        <Footer style={{ textAlign: "center" }}>Dinglun Zhou</Footer>
      </Layout>
    </div>
  );
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      maxScore: 10,
    };
  }

  componentDidUpdate() {
    if (this.state.score > this.state.maxScore)
      this.setState({
        maxScore: this.state.score,
      });
  }

  onRef = (ref) => {
    this.checkBoard = ref;
  };

  newGame = () => {
    this.checkBoard.resetGame();
  };

  render() {
    return (
      <Col span={24} sm={18} md={16} lg={10} xl={8}>
        <Card>
          <Row justify={"space-between"} gutter={[16, 16]}>
            <Col>
              <Title>2048</Title>
            </Col>
            <Col>
              <Row gutter={8}>
                <Col>
                  <Card>
                    <span>Score</span>
                    <br></br>
                    <Title level={4}>{this.state.score}</Title>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <span>Max Score</span>
                    <br></br>
                    <Title level={4}>{this.state.maxScore}</Title>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row justify={"space-between"} gutter={[16, 16]}>
            <Col>
              Join the numbers and get to the <b>2048</b> tile!
            </Col>
            <Col>
              <Button onClick={this.newGame}>New Game</Button>
            </Col>
          </Row>
          <CheckBoard onRef={this.onRef}></CheckBoard>
        </Card>
      </Col>
    );
  }
}

class CheckBoard extends React.Component {
  constructor(props) {
    super(props);
    let checkBoard = emptyCheckBoard();
    this.state = {
      checkBoard: checkBoard,
      numBlock: 0,
    };
  }

  resetGame = () => {
    let checkBoard = emptyCheckBoard();

    this.setState({
      checkBoard,
      numBlock: 0,
    });
  };

  addBlock = () => {
    let newCheckboard = [...this.state.checkBoard];
    const x = Math.floor(Math.random() * Math.floor(4));
    const y = Math.floor(Math.random() * Math.floor(4));
    const value = Math.floor(Math.random() * Math.floor(2) + 1) * 2;

    if (!newCheckboard[x][y]) {
      newCheckboard[x][y] = value;
      this.setState((state) => {
        return {
          checkBoard: newCheckboard,
          numBlock: state.numBlock + 1,
        };
      });
      this.forceUpdate();
      return { x, y, value };
    } else this.addBlock();
  };
  0;
  componentDidUpdate() {
    // if it is a new game
    if (this.state.numBlock === 0) {
      this.addBlock();
      this.addBlock();
    }
  }

  componentDidMount() {
    this.props.onRef(this);

    // init game
    this.addBlock();
    this.addBlock();
  }

  shiftBlock = () => {};

  keyPress = (e) => {
    if (e.key === "ArrowRight") console.log("right");
    if (e.key === "ArrowLeft") console.log("left");
    if (e.key === "ArrowUp") console.log("up");
    if (e.key === "ArrowDown") console.log("down");
  };

  renderCheckBoard = () => {
    const checkBoard = this.state.checkBoard.map((row, yIndex) => {
      const cols = row.map((col, xIndex) => {
        return (
          <Col key={`${xIndex}${yIndex}`} span={6}>
            <div
              className={"block"}
              style={{
                width: "80px",
                height: "80px",
                borderStyle: "solid",
                textAlign: "center",
              }}
            >
              <Title level={4} style={{ paddingTop: "30%" }}>
                {col === 0 ? <div> </div> : col}
              </Title>
            </div>
          </Col>
        );
      });
      return (
        <Row key={`${yIndex}`} gutter={[8, 8]}>
          {cols}
        </Row>
      );
    });
    return checkBoard;
  };

  render() {
    return (
      <Card
        style={{
          width: "100%",
          borderStyle: "solid",
          textAlign: "center",
        }}
        tabIndex="0"
        onKeyDown={this.keyPress.bind(this)}
      >
        {this.renderCheckBoard()}
      </Card>
    );
  }
}

export default App;
