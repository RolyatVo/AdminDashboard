import User from "../models/User.js";
import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    //hardcoded values
    const curMonth = "November";

    const curYear = 2021;
    const curDay = "2021-11-15";

    // Recent Transactions

    const transactions = await Transaction.find()
      .limit()
      .sort({ createdOn: -1 });

    const overallStat = await OverallStat.find({ year: curYear });
    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === curMonth;
    });
    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === curDay;
    });

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {}
};
