package in.shubham.billingsoftware.repositery;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.shubham.billingsoftware.entity.ItemEntity;

@Repository
public interface ItemRepositery extends JpaRepository<ItemEntity, Long> {

    ItemEntity findByItemId(String itemId);

    boolean existsByItemId(String itemId);

    void deleteByItemId(String itemId);

    Integer countByCategoryId(Long Id);

    void deleteByCategoryId(Long Id);
  
}
