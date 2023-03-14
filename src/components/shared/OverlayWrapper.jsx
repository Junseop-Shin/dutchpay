import styled from "styled-components"

export const OverlayWrapper = ({children, padding, minHeight}) => (
    <StyledContainer padding={padding} minHeight={minHeight} >{children}</StyledContainer>
)

const StyledContainer = styled.div`
    padding: ${(props) => props.padding || '5vw'};
    border-radius: 15px;
    background-color: white;
    filter: drop-shadow(0px 4px 4px gray);
    min-height: ${(props) => props.minHeight || '0'};
`;