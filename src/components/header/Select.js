import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import theme from '../../theme';

const selectFieldStyles = {
	rootStyles: {
		width: '200px',
		padding: '0px'
	}
};

const Select = ({ tags = [], activeTag, filterTag }) => {
	return (
		<div className="select-container">
			<SelectField
				value={activeTag}
				onChange={(e, i, value) => filterTag(value)}
				menuStyle={{
					textAlign: 'right'
				}}
				listStyle={{
					borderRadius: '3px',
					backgroundColor: theme.lightGrey,
					color: theme.darkGrey,
					top: '50px'
				}}
				inputStyle={{
					paddingRight: '0px'
				}}
				iconStyle={{ padding: '0px', width: '20px' }}
				underlineStyle={{ borderColor: theme.grey }}
				underlineFocusStyle={{ borderColor: theme.grey }}
				labelStyle={{ color: theme.grey }}
				menuItemStyle={{ color: theme.darkGrey, fontWeight: '500' }}
				style={selectFieldStyles.rootStyles}>
				{tags.map(tag => <MenuItem key={tag} value={tag} primaryText={tag} />)}
			</SelectField>
		</div>
	);
};

export default Select;
