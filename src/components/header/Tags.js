import React from 'react';

const Tags = ({ tags, activeTag, filterTag }) => {
	return (
		<div className="tags-container">
			{tags.map((tag, index) => (
				<span
					key={index + tag}
					className={`tag${tag === activeTag ? ' active-tag' : ''}`}
					onClick={() => filterTag(tag)}>
					{tag}
				</span>
			))}
		</div>
	);
};

export default Tags;
