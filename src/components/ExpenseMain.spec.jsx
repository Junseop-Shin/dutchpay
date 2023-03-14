import { render, screen, within } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import ExpenseMain from "./ExpenseMain";
import userEvent from "@testing-library/user-event";
import { groupMembersState } from "../state/groupMembers";

const renderComponent = () => {
    render(
        <RecoilRoot initializeState={(snap) => {
            snap.set(groupMembersState, ['준섭', '유화']);
        }}>
            <ExpenseMain />
        </RecoilRoot>
    );

    const dateInput = screen.getByPlaceholderText(/결제한 날짜/i);
    const descInput = screen.getByPlaceholderText(/비용에 대한 설명/i);
    const amountInput = screen.getByPlaceholderText(/비용은 얼마/i);
    const payerInput = screen.getByDisplayValue(/누가 결제/i);
    const addButton = screen.getByText('추가하기');

    const descErrorMessage = screen.getByText('비용에 대한 설명을 입력해주셔야합니다.');
    const payerErrorMessage = screen.getByText('결제자를 선택해주셔야 합니다.');
    const amountErrorMessage = screen.getByText('0원 이상의 금액을 입력해주셔야 합니다.');

    return {
        dateInput,
        descInput,
        amountInput,
        payerInput,
        addButton,
        descErrorMessage,
        payerErrorMessage,
        amountErrorMessage,
    };
}

describe('비용 정산 메인 페이지', () => {
    /** 비용 추가 컴포넌트 관련 테스트 */
    describe('비용 추가 컴포넌트', () => {
        test('렌더링', () => {
            const {dateInput, descInput, amountInput, payerInput, addButton} = renderComponent();
            
            expect(dateInput).toBeInTheDocument();
            expect(descInput).toBeInTheDocument();
            expect(amountInput).toBeInTheDocument();
            expect(payerInput).toBeInTheDocument();
            expect(addButton).toBeInTheDocument();
        });

        test('비용 추가에 필수적인 값 입력 없이 "추가" 버튼 클릭 시, 에러 메시지 노출', async () => {
            const {addButton, descErrorMessage, payerErrorMessage, amountErrorMessage} = renderComponent();

            expect(addButton).toBeInTheDocument();
            await userEvent.click(addButton);

            expect(descErrorMessage).toHaveAttribute('data-valid', 'false');
            expect(payerErrorMessage).toHaveAttribute('data-valid', 'false');            
            expect(amountErrorMessage).toHaveAttribute('data-valid', 'false');
        });

        test('비용 추가에 필수적인 값 입력 후 "추가" 버튼 클릭 시, 저장 성공', async () => {
            const {descInput, amountInput, payerInput, addButton, descErrorMessage, payerErrorMessage, amountErrorMessage} = renderComponent();
            await userEvent.type(descInput, '장보기');
            await userEvent.type(amountInput, '30000');
            await userEvent.selectOptions(payerInput, '준섭'); // test를 돌리기 전에 select 값이 채워져 있어야함
            await userEvent.click(addButton);

            expect(descErrorMessage).toHaveAttribute('data-valid', 'true');
            expect(payerErrorMessage).toHaveAttribute('data-valid', 'true');            
            expect(amountErrorMessage).toHaveAttribute('data-valid', 'true');
        });
    });
});

describe('비용 리스트 컴포넌트', () => {
    test('비용 리스트 컴포넌트가 렌더링 되는가', () => {
        renderComponent();
        const expenseListComponent = screen.getByTestId('expenseList');
        expect(expenseListComponent).toBeInTheDocument();
    });
});

describe('정산 결과 컴포넌트', () => {
    test('정산 결과 컴포넌트가 렌더링 되는가', () => {
        renderComponent();
        const resultComponent = screen.getByText(/정산은 이렇게/i);
        expect(resultComponent).toBeInTheDocument();
    });
});

describe('새로운 비용이 추가되었을 때', () => {
    const addNewExpense = async () => {
        const {dateInput, descInput, amountInput, payerInput, addButton} = renderComponent();
        await userEvent.type(dateInput, '2023-03-14');
        await userEvent.type(descInput, '장보기');
        await userEvent.type(amountInput, '30000');
        await userEvent.selectOptions(payerInput, '준섭');
        await userEvent.click(addButton);
    }
    test('날짜, 내용, 결제자, 금액 데이터 정산 리스트에 추가 된다', async () => {
        await addNewExpense();
        const expenseListComponent = screen.getByTestId('expenseList');

        const dateValue = within(expenseListComponent).getByText('2023-03-14');
        expect(dateValue).toBeInTheDocument();
        const descValue = within(expenseListComponent).getByText('장보기');
        expect(descValue).toBeInTheDocument();
        const amountValue = within(expenseListComponent).getByText('30000 원');
        expect(amountValue).toBeInTheDocument();
        const payerValue = within(expenseListComponent).getByText('준섭');
        expect(payerValue).toBeInTheDocument();
    });

    test('정산 결과가 업데이트 된다', async () => {
        await addNewExpense();
        const totalText = screen.getByText(/2명 - 총 30000원 지출/i);
        expect(totalText).toBeInTheDocument();
        
        const transactionText = screen.getByText(/유화가 준섭에게 15000원/i);
        expect(transactionText).toBeInTheDocument();
    });
});