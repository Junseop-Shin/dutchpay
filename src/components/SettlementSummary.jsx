import { useRecoilValue } from "recoil";
import { expensesState } from "../state/expenses";
import { groupMembersState } from "state/groupMembers";
import styled from "styled-components";
import { StyledTitle, StyledWrapper } from "./AddExpenseForm";

export const calculateMinimulTransaction = (expenses, members, splitAmount) => {
    const minTransactions = [];

    if (splitAmount === 0) {
        return minTransactions;
    }

    // 1. 사람별로 냈어야할 금액
    const membersToPay = {};
    members.forEach(member =>
        membersToPay[member] = splitAmount
    );

    // 2. 사람별로 냈어야할 금액 업데이트
    expenses.forEach(({payer, amount}) =>
        membersToPay[payer] -= amount
    );

    // 3. sortedMembers
    const sortedMembersToPay = Object.keys(membersToPay)
    .map(member => (
        {member: member, amount: membersToPay[member]}
    ))
    .sort((a,b) => a.amount - b.amount);

    // 4.
    var left = 0;
    var right = sortedMembersToPay.length - 1;

    while (left < right) {
        while (left < right && sortedMembersToPay[left] === 0) {
            left++;
        }
        while (left < right && sortedMembersToPay[right] === 0) {
            right--;
        }

        const toReceive = sortedMembersToPay[left];
        const toSend = sortedMembersToPay[right];
        const amountToReceive = Math.abs(toReceive.amount);
        const amountToSend = Math.abs(toSend.amount);

        if (amountToSend > amountToReceive) {
            minTransactions.push({
                receiver: toReceive.member,
                payer: toSend.member,
                amount: amountToReceive,
            });
            toReceive.amount = 0;
            toSend.amount -= amountToReceive;
            left++;
        } else {
            minTransactions.push({
                receiver: toReceive.member,
                payer: toSend.member,
                amount: amountToSend,
            });
            toSend.amount = 0;
            toReceive.amount += amountToSend;
            right--;
        }
    }

    return minTransactions;
}

export const SettlementSummary = () => {
    const expenses = useRecoilValue(expensesState);
    const members = useRecoilValue(groupMembersState);
    const totalExpenseAmount = expenses.reduce((prevExpense, curExpense) => prevExpense + curExpense.amount, 0);
    const groupMembersCount = members.length;
    const splitAmount = totalExpenseAmount/groupMembersCount;

    //TODO: 핵심 로직 구현
    const minimunTransaction = calculateMinimulTransaction(expenses, members, splitAmount);

    return (
        <StyledWrapper>
            <StyledTitle>2. 정산은 이렇게!</StyledTitle>
            { totalExpenseAmount > 0 && groupMembersCount > 0 && (
                <>
                    <StyledSummary>
                        <span>{groupMembersCount} 명이서 총 {totalExpenseAmount} 원 지출</span>
                        <br />
                        <span>한 사람당 {splitAmount} 원</span>
                    </StyledSummary>
                    <StyledUl>
                        {minimunTransaction.map(({receiver, sender, amount}, idx) => (
                            <li key={`transaction-${idx}`}>
                                <span>{sender}가 {receiver}에게 {amount}원 보내기</span>
                            </li>
                        ))}
                    </StyledUl>
                </>
            )}
        </StyledWrapper>
    );
}

const StyledUl = styled.ul`
    margin-top: 31px;
    font-weight: 600;
    line-height: 200%;
    text-align: center;

    list-style-type: disclosure-closed;
    li::marker {
        animation: blinker 1.5s linear infinite;
    }

    @keyframes blinker {
        50% {
            oparcity: 0;
        }
    }
`;

const StyledSummary = styled.div`
    margin-top: 31px;
`;