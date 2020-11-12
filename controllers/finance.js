import { Finance, Student } from '../models';

class FinanceController {
  async record(req, res) {
    const { amount } = req.body;
    let newFinance;
    if (amount >= 60000) {
      newFinance = {
        amount,
        status: 'paid',
      };
    } else {
      newFinance = {
        amount,
        status: 'unpaid',
      };
    }
    const finance = await Finance.create(newFinance);
    const student = await Student.findOne({ where: { id: req.params.id } });
    if (!student)
      return res.status(404).json({
        status: 'failed',
        msg: 'Student not found',
      });
    const newStudent = {
      finance: finance.id,
    };
    const updateStudent = await Student.update(newStudent, {
      where: { id: req.params.id },
      returning: true,
    });
    res.status(200).json({
      status: 'ok',
      msg: 'Finance recorded success',
      finance,
      student: updateStudent,
    });
  }
}
export default FinanceController;
