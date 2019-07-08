package edu.practice.mapper;

import java.util.List;

import edu.practice.domain.BoardVO;
import edu.practice.domain.Criteria;

public interface BoardMapper {
	public List<BoardVO> getList();

	public void insert(BoardVO board);

	public void insertSelectKey(BoardVO board);

	public BoardVO read(Long bno);

	public int delete(Long bno);

	public int update(BoardVO board);
	
	public List<BoardVO> getListWithPaging(Criteria cri);
	
	public int getTotalCount(Criteria cri);
	
}
