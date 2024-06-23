import React from 'react';
import classes from './PaginationSection.module.css';
import { IconTextButton, ButtonContainer } from './ButtonSection';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Text from './TextSection';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={classes.list_pagination_container}>
      <hr className={classes.horizontal_line} />
      <IconTextButton
        inconTextButtonStyle={classes.previous_pagination_icon_text_container}
        label={'Previous'}
        icon={faChevronLeft}
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      />

      <div className={classes.pagination_button_main_container}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <ButtonContainer
            key={page}
            buttonContainerMainContainer={[
              classes.pagination_button_container,
              page === currentPage ? classes.active_page : '',
            ].join(' ')}
            onClick={() => onPageChange(page)}
            children={<Text label12={`${page}`} />}
          />
        ))}
      </div>

      <IconTextButton
        inconTextButtonStyle={classes.next_pagination_icon_text_container}
        label={'Next'}
        icon={faChevronRight}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};

export default Pagination;
