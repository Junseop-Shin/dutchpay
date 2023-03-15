import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { groupMembersState } from "../state/groupMembers";
import { expensesState } from "../state/expenses";
import styled from "styled-components";

export const AddExpenseForm = () => {
    const members = useRecoilValue(groupMembersState);
    const setExpense = useSetRecoilState(expensesState);
    const [validated, setValidated] = useState(false);

    const [isDescValid, setIsDescValid] = useState(false);
    const [isAmountValid, setIsAmountValid] = useState(false);
    const [isPayerValid, setIsPayerValid] = useState(false);
    const today = new Date();
    const todayString = [today.getFullYear(), today.getMonth() + 1, today.getDay()].join('-');
    const [date, setDate] = useState(todayString);
    const [desc, setDesc] = useState('');
    const [amount, setAmount] = useState(0);
    const [payer, setPayer] = useState(null);

    const checkFormValidity = () => {
        const descValid = desc.length > 0;
        const payerValid = payer !== null;
        const amountValid = amount > 0;
        setIsDescValid(descValid);
        setIsPayerValid(payerValid);
        setIsAmountValid(amountValid);

        return descValid && payerValid && amountValid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (checkFormValidity()) {
            const newExpense = {
                date,
                desc,
                amount,
                payer,
            };

            setExpense(expense => [
                ...expense,
                newExpense,
            ]);

            setDate(todayString);
            setDesc('');
            setAmount(0);
            setPayer(null);
        }
        setValidated(true);
    }

    return (
            <StyledWrapper>
            <Form noValidate onSubmit={handleSubmit}>
                <StyledTitle>1. 비용 추가하기</StyledTitle>
                <Row>
                    <Col xs={12}>
                        <StyledFormGroup>
                            <Form.Control
                                type='date'
                                value={date}
                                placeholder='결제한 날짜를 선택해주세요.'
                                onChange={e => setDate(e.target.value)}
                            />
                        </StyledFormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <StyledFormGroup>
                            <Form.Control
                                type='text'
                                value={desc}
                                placeholder='비용에 대한 설명을 입력해주세요'
                                isValid={isDescValid}
                                isInvalid={!isDescValid && validated}
                                onChange={e => setDesc(e.target.value)}
                            />
                            <Form.Control.Feedback type='invalid' data-valid={isDescValid}>
                                비용에 대한 설명을 입력해주셔야합니다.
                            </Form.Control.Feedback>
                        </StyledFormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} lg={6}>
                        <StyledFormGroup>
                            <Form.Control
                                type='number'
                                value={amount}
                                placeholder='비용은 얼마였나요?'
                                isValid={isAmountValid}
                                isInvalid={!isAmountValid && validated}
                                onChange={e => setAmount(e.target.value)}
                            />
                            <Form.Control.Feedback type='invalid' data-valid={isAmountValid}>
                                0원 이상의 금액을 입력해주셔야 합니다.
                            </Form.Control.Feedback>
                        </StyledFormGroup>
                    </Col>
                    <Col xs={12} lg={6}>
                        <StyledFormGroup>
                            <Form.Select
                                defaultValue=''
                                value={payer ? payer : ''}
                                isValid={isPayerValid}
                                isInvalid={!isPayerValid && validated}
                                onChange={e => setPayer(e.target.value)}
                            >
                                <option disabled value=''>누가 결제했나요?</option>
                                {members.map((member) => (
                                    <option key={member}>{member}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type='invalid' data-valid={isPayerValid}>
                                결제자를 선택해주셔야 합니다.
                            </Form.Control.Feedback>
                        </StyledFormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <StyledSubmitButton type='submit'>추가하기</StyledSubmitButton>
                    </Col>
                </Row>
            </Form>
        </StyledWrapper>
    );
}

export const StyledWrapper = styled.div`
    padding: 50px;
    background-color: #683BA1;
    box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
`;

const StyledFormGroup = styled(Form.Group)`
    margin-bottom: 18px;

    input, select {
        background-color: #59359A;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        border: 0px;
        color: #F8F9FA;
        height: 45px;

        &:focus {
            background-color: #59359A;
            color: #F8F9FA;
            filter: brightness(80%);
        }
    }
`;

export const StyledTitle = styled.h3`
    color: #FFFBFB;
    text-align: center;
    font-weight: 700;
    font-size: 40px;
    line-height: 48px;
    letter-spacing: 0.25px;
    margin-bottom: 18px;
`;

const StyledSubmitButton = styled(Button).attrs({
    type: 'submit'
})`
    width: 100%;
    height: 60px;
    padding: 16px 32px;
    gap: 8px;
    border: 0px;
    border-radius: 8px;
    background-color: #E2D9F3;
    color: #59359A;
    margin-top: 10px;
    &:hover, &:focus {
        background-color: #E2D9F3;
        brightness(80%);
    }
`;