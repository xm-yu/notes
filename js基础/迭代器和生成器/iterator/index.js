/**
 * iterator 迭代器
 **/

// es6之前
{
  window.onload = function () {
    const nodeList = document.querySelectorAll('div');
    // console.log(nodeList);
    for (let i = 0; i < nodeList.length; i++) {
      const node = nodeList[i];
      console.log(node);
    }

    for (const node of nodeList) {
      console.log(node);
    }
  };
}
