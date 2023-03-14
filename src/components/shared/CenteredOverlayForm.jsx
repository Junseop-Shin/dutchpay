import { Container, Row, Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { OverlayWrapper } from './OverlayWrapper';
import { ServiceLogo } from './ServiceLogo';

const CenteredOverlayForm = ({title, children, validated, handleSubmit}) => {
    return (
        <StyledCentralizedContainer>
            <ServiceLogo />
            <OverlayWrapper>
            <Container>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <StyledCentralizedContents>
                        <Row className='align-items-start'>
                            <StyledTitle>{title}</StyledTitle>
                        </Row>
                        <Row className='align-items-center'>
                            {children}
                        </Row>
                        <Row className='align-items-end'>
                            <StyledSubmitButton type='submit'>저장</StyledSubmitButton>
                        </Row>
                    </StyledCentralizedContents>
                </Form>
            </Container>
            </OverlayWrapper>
        </StyledCentralizedContainer>
    );
}

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

export const StyledTitle = styled.h2`
    font-weight: 700;
    line-height: 35px;
    text-align: right;
    overflow-wrap: break-word;
    word-break: keep-all;
`;

export const StyledCentralizedContents = styled(Row)`
    height: 60vh;
    justify-content: center;
    align-items: center;
`;

export const StyledSubmitButton = styled(Button).attrs({
    type: 'submit'
})`
    background-color: #6610F2;
    border-radius: 8px;
    border: none;

    &:hover {
        background-color: #6610F2;
        filter: brightness(80%);
    }
`;

export default CenteredOverlayForm