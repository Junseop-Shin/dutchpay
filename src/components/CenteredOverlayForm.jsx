import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import { OverlayWrapper } from './shared/OverlayWrapper';

const CenteredOverlayForm = ({children}) => {
    return (
        <StyledCentralizedContainer>
            <StyledHeader>Dutch Pay</StyledHeader>
            <OverlayWrapper>
                {children}
            </OverlayWrapper>
        </StyledCentralizedContainer>
    );
}

const StyledHeader = styled.h1`
    font-weight: 200;
    letter-spacing: 10px;
`;

const StyledCentralizedContainer = styled(Container)`
    width: 50vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 10px;
`;

export default CenteredOverlayForm