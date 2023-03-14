import { useRecoilValue } from "recoil";
import { expensesState } from "../state/expenses";
import { Table } from "react-bootstrap";
import { OverlayWrapper } from "./shared/OverlayWrapper";
import styled from "styled-components";

export const ExpenseTable = () => {
    const expenses = useRecoilValue(expensesState);
    return (
        <OverlayWrapper minHeight={"73vh"}>
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
                            <td>{amount} 원</td>
                        </tr>
                    ))}
                </StyledTBody>
            </Table>
        </OverlayWrapper>
    );
}

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
    }
`;