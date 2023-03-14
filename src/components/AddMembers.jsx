import CenteredOverlayForm from './shared/CenteredOverlayForm';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { InputTags } from 'react-bootstrap-tagsinput';
import { groupMembersState } from '../state/groupMembers';
import { groupNameState } from '../state/groupName';
import styled from 'styled-components';

const AddMembers = () => {
    const [groupMembers, setGroupMembers] = useRecoilState(groupMembersState);
    const groupName = useRecoilValue(groupNameState);
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setValidated(true);
    };

    const header = `${groupName} 그룹에 속한 사람들의 이름을 모두 적어주세요.`
    return (
        <CenteredOverlayForm
            title={header}
            validated={validated}
            handleSubmit={handleSubmit}
        >
            <InputTags
                data-testId='input-member-names'
                placeholder='이름 간 띄어쓰기'
                onTags={(value) => setGroupMembers(value.values)}
            />
            {validated && groupMembers.length === 0 && 
                (<StyledErrorMessage>그룹 멤버들의 이름을 입력해주세요.</StyledErrorMessage>)
            }
        </CenteredOverlayForm>
    );
}

const StyledErrorMessage = styled.span`
    color: red;
`;
export default AddMembers