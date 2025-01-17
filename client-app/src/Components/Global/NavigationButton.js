import React from 'react'
import { ButtonWithoutBorder, ButtonWithoutBorderWrapper } from '../Styled/StyledGlobal';

export const NavigationButtonWithoutBorder = (props) => {
    return (
        
        <ButtonWithoutBorderWrapper>
            <ButtonWithoutBorder
                type="submit"
                id="button"
                value={props.value}
                onClick={props.onClick}
            />
        </ButtonWithoutBorderWrapper>
    )
}
