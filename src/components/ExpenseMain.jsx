import { AddExpenseForm } from "./AddExpenseForm";

const ExpenseMain = () => {
    return (
        <div>
            ExpenseMain
            <div>
                {/* TODO: 비용 추가 폼 렌더링 */}
                <AddExpenseForm />
                {/* TODO: 정산 결과 컴포넌트 렌더링 */}
            </div>
            <div>
                {/* TODO: 그룹명 헤더 렌더링 */}
                {/* TODO: 비용 리스트 컴포넌트 렌더링 */}
            </div>
        </div>
    );
}

export default ExpenseMain;