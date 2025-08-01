package com.example.paint.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Drawing drawing;

    public User() {}

    public User(String username) {
        this.username = username;
    }

    public Long getId() { return this.id; }

    public void setId(Long id) { this.id = id; }

    public String getUsername() { return this.username; }

    public void setUsername(String username) { this.username = username; }

    public Drawing getDrawing() { return this.drawing; }

    public void setDrawing(Drawing drawing) {
        this.drawing = drawing;
        if (drawing != null && drawing.getUser() != this) drawing.setUser(this);
    }
}
