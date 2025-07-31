package entity;

import jakarta.persistence.*;

@Entity
public class Drawing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private String content;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Drawing() {}

    public Drawing(User user, String content) {
        this.user = user;
        this.content = content;
        if (user != null) user.setDrawing(this);
    }

    public Long getId() { return this.id; }

    public void setId(Long id) { this.id = id; }

    public String getContent() { return this.content; }

    public void setContent(String content) { this.content = content; }

    public User getUser() { return this.user; }

    public void setUser(User user) {
        this.user = user;
        if (user != null) user.setDrawing(this);
    }
}
