import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RecoilRoot } from "recoil";
import AddMembers from "./AddMembers";

const renderComponent = () => {
    render(
        <RecoilRoot>
            <AddMembers />
        </RecoilRoot>
    );

    const input = screen.getByTestId('input-member-names');
    const saveButton = screen.getByText('저장');

    return {input, saveButton};
}

describe('그룹 멤버 추가 페이지', () => {
    test('그룹 멤버 입력 컴포넌트가 렌더링 되는가', () => {
        const {input, saveButton} = renderComponent();
        
        expect(input).not.toBeNull();
        expect(saveButton).not.toBeNull();
    });
    

    test('그룹 멤버를 입력하지 않고 저장 버튼 클릭 시 에러 메시지 노출', async () => {
        const {saveButton} = renderComponent();

        await userEvent.click(saveButton);

        const errorMessage = await screen.findByText('그룹 멤버들의 이름을 입력해주세요.');
        expect(errorMessage).toBeInTheDocument();
    });
    
    test('그룹 멤버를 입력 후 저장 버튼 클릭 시 저장 성공', async () => {
        const {input, saveButton} = renderComponent();

        await userEvent.type(input, '준섭 유화 광호 현호');
        await userEvent.click(saveButton);

        const errorMessage = screen.queryByText('그룹 멤버들의 이름을 입력해주세요.');
        expect(errorMessage).toBeNull();
    });
});
