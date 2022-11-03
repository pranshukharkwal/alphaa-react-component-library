function getKeys(data: any) {
  console.log("Data received in get keys", data);
  var categoryKey: any;
  var dataKeys: any[] = [];
  if (data && data.parameters) {
    data.parameters.forEach((parameter: any) => {
      if (parameter.type === "columns") categoryKey = parameter.key;
      else if (parameter.type === "vs") dataKeys.push(parameter.key);
    });
  } else {
    console.log("Parameters do not exists");
  }
  dataKeys.sort().reverse();
  return { categoryKey: categoryKey, dataKeys: dataKeys };
}

function getWaterfallOption(data: any, keysResult: any) {
  console.log("Keys result", keysResult);
  let positive: any[] = [],
    negative: any[] = [],
    help: any[] = [],
    total: any[] = [],
    categories: any[] = [];
  var profit = 0,
    loss = 0;
  var option: any = {
    legend: {},
    title: {
      text: "Accumulated Waterfall Chart",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      splitLine: { show: true },
      axisLine: {
        lineStyle: {
          width: 1,
          color: "black",
          shadowColor: "black",
          shadowOffsetY: 2,
        },
      },
      axisLabel: {
        interval: 0,
        rotate: 90,
      },
      data: [],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        type: "bar",
        stack: "all",
        itemStyle: {
          normal: {
            barBorderColor: "rgba(0,0,0,0)",
            color: "rgba(0,0,0,0)",
          },
          emphasis: {
            barBorderColor: "rgba(0,0,0,0)",
            color: "rgba(0,0,0,0)",
          },
        },
        data: help,
      },
      {
        name: "positive",
        type: "bar",
        stack: "all",
        data: positive,
        label: {
          normal: {
            show: true,
            position: "top",
          },
        },
        axisLine: {
          symbol: "arrow",
          lineStyle: {
            type: "dashed",
          },
        },
        itemStyle: {
          color: "#bef1c6",
        },
      },
      {
        name: "negative",
        type: "bar",
        stack: "all",
        data: negative,
        itemStyle: {
          color: "#f5b4c4",
        },
        label: {
          normal: {
            show: true,
            position: "bottom",
          },
        },
      },
      {
        name: "total",
        type: "bar",
        stack: "all",
        data: total,
        itemStyle: {
          color: "#c8e7f9",
        },
        label: {
          normal: {
            show: true,
            position: "middle",
          },
        },
      },
    ],
  };

  if (data && data.data) {
    var newData: any[] = [];
    var curSum = 0;
    data.data.forEach((category: any) => {
      var val =
        Math.round(
          (category[keysResult.dataKeys[0]] -
            category[keysResult.dataKeys[1]]) *
          100
        ) / 100;
      if (val < 0) loss += val;
      else profit += val;
      curSum += val;
      newData.push({
        difference: val,
        subcategory: category[keysResult.categoryKey],
      });
    });
    if (curSum < 0) {
      newData.sort((a, b) => {
        return a.difference - b.difference;
      });
    } else {
      newData.sort((a, b) => {
        return b.difference - a.difference;
      });
    }

    var sum = 0;
    for (var i = 0; i < newData.length; ++i) {
      categories.push(newData[i].subcategory);
      total.push("-");
      if (newData[i].difference >= 0) {
        positive.push(newData[i].difference);
        negative.push("-");
      } else {
        positive.push("-");
        negative.push(-newData[i].difference);
      }

      if (curSum < 0) {
        if (i === 0) {
          help.push(0);
        } else {
          sum += -1 * newData[i - 1].difference;
          if (newData[i].difference > 0) {
            help.push(sum - newData[i].difference);
          } else {
            help.push(sum);
          }
        }
      } else {
        if (i === 0) {
          help.push(0);
        } else {
          sum += newData[i - 1].difference;
          if (newData[i].difference < 0) {
            help.push(sum + newData[i].difference);
          } else {
            help.push(sum);
          }
        }
      }
    }

    console.log("Categories :", categories);

    if (curSum < 0) sum += -1 * newData[newData.length - 1].difference;
    else sum += newData[newData.length - 1].difference;
    sum = Math.round(sum * 100) / 100;
    positive.push("-");
    negative.push("-");
    help.push("-");
    total.push(sum);
    categories.push("Total");

    option.xAxis.data = categories;
    option.series[0].data = help;
    option.series[1].data = positive;
    option.series[2].data = negative;
    option.series[3].data = total;
  }
  return { option: option, profit: profit, loss: loss };
}

function getNetDifferenceOption(data: any, keysResult: any) {
  var profit = 0,
    loss = 0;
  var option: any = {
    title: {
      text: "Net Difference",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      axisLine: {
        lineStyle: {
          width: 1,
          color: "black",
          shadowColor: "black",
          shadowOffsetY: 2,
        },
      },
      data: [],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        // data: [120, 200, 150, 80, 70, 110, 130],
        data: [],
        type: "bar",
        label: {
          normal: {
            show: true,
            position: "top",
          },
        },
        stack: "all",
      },
      {
        // data: [120, 200, 150, 80, 70, 110, 130],
        data: [],
        type: "bar",
        label: {
          normal: {
            show: true,
            position: "bottom",
          },
        },
        stack: "all",
        itemStyle: {
          color: "#f33",
        },
      },
    ],
  };
  if (data && data.data) {
    var categories: any = [],
      positive: any = [],
      negative: any = [];
    data.data.forEach((category: any) => {
      var value =
        Math.round(
          (category[keysResult.dataKeys[0]] -
            category[keysResult.dataKeys[1]]) *
          100
        ) / 100;
      if (value < 0) {
        negative.push(value);
        positive.push("-");
        loss += value;
      } else {
        negative.push("-");
        positive.push(value);
        profit += value;
      }
      categories.push(category[keysResult.categoryKey]);
    });
  }
  option.xAxis.data = categories;
  option.series[0].data = positive;
  option.series[1].data = negative;
  return { option: option, profit: profit, loss: loss };
}

function getOption(chartType: any, data: any, inputData: any) {
  let option: any,
    usingInputData: any,
    profit: any = 0,
    loss: any = 0,
    net: any,
    result: any;
  console.log("Received input data", inputData);
  console.log("Received api data", data);
  var keysResult;
  try {
    usingInputData = true;
    var inputObj = JSON.parse(inputData);
    if (!inputObj.parameters) throw Error("No parameters defined");
    keysResult = getKeys(inputObj);
    switch (chartType) {
      case "waterfall":
        result = getWaterfallOption(inputObj, keysResult);
        option = result.option;
        profit = result.profit;
        loss = result.loss;
        break;
      case "net-difference":
        result = getNetDifferenceOption(inputObj, keysResult);
        option = result.option;
        profit = result.profit;
        loss = result.loss;
        break;
      default:
        option = {};
    }
  } catch {
    console.log("Failed");
    usingInputData = false;
    keysResult = getKeys(data);
    switch (chartType) {
      case "waterfall":
        result = getWaterfallOption(data, keysResult);
        option = result.option;
        profit = result.profit;
        loss = result.loss;
        break;
      case "net-difference":
        result = getNetDifferenceOption(data, keysResult);
        option = result.option;
        profit = result.profit;
        loss = result.loss;
        break;
      default:
        option = {};
    }
  }
  profit = profit.toFixed(2);
  loss = Math.abs(loss).toFixed(2);
  net = (profit - loss).toFixed(2);
  return { option, usingInputData, profit, loss, net };
}

export default { getOption };
