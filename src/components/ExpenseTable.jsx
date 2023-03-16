import { useRecoilValue } from "recoil";
import { expensesState } from "../state/expenses";
import { Table } from "react-bootstrap";
import styled from "styled-components";

export const ExpenseTable = () => {
    const expenses = useRecoilValue(expensesState);
    return (
        <StyledWrapper>
            <Table data-testid='expenseList' borderless hover responsive>
                <StyledTHead>
                    <tr>
                        <th>날짜</th>
                        <th>내용</th>
                        <th>결제자</th>
                        <th>금액</th>
                    </tr>
                </StyledTHead>
                <StyledTBody>
                    {expenses.map(({date, desc, amount, payer}, idx) => (
                        <tr key={`expense-${idx}`}>
                            <td>{date}</td>
                            <td>{desc}</td>
                            <td>{payer}</td>
                            <td>{`${amount} 원`}</td>
                        </tr>
                    ))}
                </StyledTBody>
            </Table>
        </StyledWrapper>
    );
}
const StyledWrapper = styled.div`
    padding: '5vw';
    border-radius: 15px;
    background-color: white;
    filter: drop-shadow(0px 4px 4px gray);
    min-height: 140vh;

    @media (max-width: 500px) {
        min-height: 50vh;
    }
`;

const StyledTHead = styled.thead`
    color: #683DA6;
    text-align: center;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;

    th {
        padding: 20px 8px;
    }
`;

const StyledTBody = styled.tbody`
    td {
        font-weight: 400;
        font-size: 24px;
        line-height: 59px;
        text-align: center;
        
        @media (max-width: 500px) {
            font-size: 18px;
            line-height: 30px;
        }
    }
`;