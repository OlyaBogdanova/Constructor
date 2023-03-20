import React, { useEffect, useState, useContext } from "react";
import { NumberContext } from "../NumberProvider";
import Display from "../Display/Display";
import NumberContainer from "../NumberContainer/NumberContainer";
import "./Constructor.scss";
import ResultButton from "../ResultButton/ResultButton";
import icon from "../../Icons/iconAddElem.svg";

type Props = {};

type BoardItem = {
  id: number;
  elem: any;
  disabled: boolean;
  hover: boolean;
};
type BoardType = {
  id: number;
  title: string;
  items: Array<BoardItem>;
};

function Constructor(props: Props) {
  const { typeOfCalc } = useContext(NumberContext);
  const number = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', "."];
  const symbol = ["/", "*", "-", "+"];
  const [boards, setBoards] = useState<Array<BoardType>>([
    {
      id: 1,
      title: "Конструктор",
      items: [
        {
          id: 3,
          elem: (type: string) => <Display disabled={false} hover={false} />,
          disabled: false,
          hover: false,
        },
        {
          id: 4,
          elem: (type: string) => (
            <NumberContainer
              data={symbol}
              basis="4"
              wrap={false}
              disabled={false}
              hover={false}
            />
          ),
          disabled: false,
          hover: false,
        },
        {
          id: 5,
          elem: (type: string) => (
            <NumberContainer data={number} disabled={false} hover={false} />
          ),
          disabled: false,
          hover: false,
        },
        {
          id: 6,
          elem: (type: string) => (
            <ResultButton disabled={false} hover={false} />
          ),
          disabled: false,
          hover: false,
        },
      ],
    },
    {
      id: 2,
      title: "Доска",
      items: [],
    },
  ]);
  const [currentBoard, setCurrentBoard] = useState<null | BoardType>(null);
  const [currentItem, setCurrentItem] = useState<null | BoardItem>(null);

  //Подсветка родителя
  function dragOverHandlerParent(e: any) {
    e.preventDefault();

    if (e.target.classList.contains("board2")) {
      e.target.style.background = "#F0F9FF";
    }
  }

  function dragOverHandler(e: any, board: BoardType, item: BoardItem) {
    if (currentBoard && currentItem) {
      if (
        (board.id === currentBoard.id && board.id === 2) ||
        (board.id === 2 && currentBoard.id === 1)
      ) {
        if (currentItem.id !== item.id) {
          setBoards((prevBoards) => {
            return prevBoards.map((b) => {
              if (b.id === board.id) {
                item.hover = true;
                return board;
              }
              return b;
            });
          });
        }
      }
    }
  }

  function dropLeaveHandler(e: any) {
    if (e.target.classList.contains("board2")) {
      e.target.style.background = "white";
    }
  }

  function dropLeaveHandlerItem(e: any, board: BoardType, item: BoardItem) {
    setBoards((prevBoards) => {
      return prevBoards.map((b) => {
        if (b.id === board.id) {
          item.hover = false;
          return board;
        }
        return b;
      });
    });
  }

  function dragStartHandler(e: any, board: BoardType, item: BoardItem) {
    setCurrentBoard(board);
    setCurrentItem(item);
  }

  function dropHandler(e: any, board: BoardType, item: BoardItem) {
    e.preventDefault();
    if (currentBoard && currentItem) {
      const currentIndex = currentBoard.items.indexOf(currentItem);
      if (currentBoard.id === 2 && currentBoard.id !== board.id) {
        currentBoard.items.splice(currentIndex, 1);
      }
      if (currentBoard.id === 2 && currentBoard.id === board.id) {
        const dropIndex = board.items.indexOf(item);
        const currentIndex = board.items.indexOf(currentItem);
        if (dropIndex > currentIndex) {
          board.items.splice(dropIndex + 1, 0, currentItem);
          board.items.splice(currentIndex, 1);
        } else {
          board.items.splice(currentIndex, 1);
          board.items.splice(dropIndex, 0, currentItem);
        }
      }
      if (currentBoard.id === 1 && currentBoard.id !== board.id) {
        const dropIndex = board.items.indexOf(item);
        board.items.splice(dropIndex + 1, 0, { ...currentItem });
        currentBoard.items[currentBoard.items.indexOf(currentItem)].disabled =
          true;
      }

      setBoards((prevBoards) => {
        return prevBoards.map((b) => {
          if (b.id === board.id) {
            return board;
          } else if (currentBoard && b.id === currentBoard.id) {
            return currentBoard;
          }
          return b;
        });
      });
    }
  }
  function dragEndHandler(e: any, board: BoardType, item: BoardItem) {
    console.log("end");

    if (currentBoard && currentItem) {
      if (board.id === currentBoard.id) {
        console.log("endid");

        setBoards((prevBoards) => {
          return prevBoards.map((b) => {
            b.items.map((el) => (el.hover = false));
            return b;
          });
        });
      }
    }
  }

  function dropCardHandler(e: any, board: BoardType) {
    if (e.target.classList.contains("board2")) {
      e.target.style.background = "white";
    }
    if (currentItem && currentBoard) {
      if (board.id === 2 && currentBoard.id === 1) {
        const item = Object.assign({}, currentItem);
        item.disabled = false;
        if (board.items.findIndex((elem) => elem.id === item.id) === -1) {
          board.items.push(item);
          setCurrentItem((prev) => {
            if (prev) {
              prev.disabled = true;
            }
            return prev;
          });
        }
      } else if (board.id === 1) {
        const i = board.items.findIndex((elem) => elem.id === currentItem.id);

        setBoards((prevBoards) => {
          return prevBoards.map((b) => {
            if (b.id === board.id) {
              b.items[i].disabled = false;
            }
            return b;
          });
        });
      }
    }

    setBoards((prevBoards) => {
      return prevBoards.map((b) => {
        if (b.id === board.id) {
          return board;
        }

        if (currentBoard && b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      });
    });
  }
let classListCont;
if(typeOfCalc==='Runtime'){
  classListCont=' full'
}
  return (
    <div className={`calc_container ${classListCont}`}>
      {boards.map((board) => {
        let classList = "board";
        if (board.items.length === 0 && board.id === 2) {
          classList = "board empty";
        }
        if (board.id === 2) {
          classList += " board2";
        }
        if(board.id===1 && typeOfCalc==='Runtime'){
          classList += " hide";
        }
        return (
          <div
            className={classList}
            key={board.id}
            onDragOver={(e) => dragOverHandlerParent(e)}
            onDrop={(e) => dropCardHandler(e, board)}
            onDragLeave={(e) => dropLeaveHandler(e)}
          >
            {board.items.length > 0 ? (
              <div className="item">
                {board.items.map((item) => {
                  let classList = "item_item";
                  if (item.disabled) {
                    classList = classList + " disabled";
                  }
                  let classListElemTop = "elem";
                  let classListElemBottom = "elem";

                  if (
                    item.hover &&
                    currentItem &&
                    board.items.indexOf(item) <
                      board.items.indexOf(currentItem) &&
                    board.id === 2
                  ) {
                    classListElemTop = classListElemTop + " hover";
                  }
                  if (
                    (item.hover &&
                      currentItem &&
                      board.id === 2 &&
                      board.items.indexOf(item) >
                        board.items.indexOf(currentItem) &&
                      board.id === 2) ||
                    (currentBoard &&
                      board.id !== currentBoard.id &&
                      currentBoard.id === 1 &&
                      item.hover)
                  ) {
                    classListElemBottom = classListElemBottom + " hover";
                  }

                  return (
                    <>
                      <div className={classListElemTop}>
                        {item.hover &&
                        currentItem &&
                        board.id === 2 &&
                        board.items.indexOf(item) <
                          board.items.indexOf(currentItem) ? (
                          <div className="elem_border" />
                        ) : null}
                      </div>

                      <div
                        className={classList}
                        key={board.id}
                        draggable={item.disabled ? false : true}
                        onDragOver={(e) => dragOverHandler(e, board, item)}
                        onDragStart={(e) => dragStartHandler(e, board, item)}
                        onDrop={(e) => dropHandler(e, board, item)}
                        onDragLeave={(e) =>
                          dropLeaveHandlerItem(e, board, item)
                        }
                        onDragEnd={(e) => dragEndHandler(e, board, item)}
                      >
                        {item.elem(typeOfCalc)}
                      </div>
                      <div className={classListElemBottom}>
                        {(item.hover &&
                          currentItem &&
                          board.id === 2 &&
                          board.items.indexOf(item) >
                            board.items.indexOf(currentItem)) ||
                        (currentBoard &&
                          currentBoard.id !== board.id &&
                          board.id === 2 &&
                          item.hover) ? (
                          <div className="elem_border" />
                        ) : null}
                      </div>
                    </>
                  );
                })}
              </div>
            ) : (
              <>
                <img className="emptyBlock_img" src={icon} alt="addElem" />
                <div className="emptyBlock_title">
                  <span>Перетащите сюда</span> любой элемент из левой панели
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Constructor;
