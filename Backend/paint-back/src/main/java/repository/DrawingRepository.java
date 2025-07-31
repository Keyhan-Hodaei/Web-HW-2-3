package repository;

import entity.Drawing;
import entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrawingRepository extends JpaRepository<Drawing, Long> {
    Drawing findByUser(User user);
}
