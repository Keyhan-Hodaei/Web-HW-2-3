package com.example.paint.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.paint.service.DrawingService;
import org.springframework.http.MediaType;

@RestController
@RequestMapping("/api/drawings")
@CrossOrigin(origins = "http://localhost:3000")
public class DrawingController {
    private final DrawingService drawingService;

    public DrawingController(DrawingService drawingService) {
        this.drawingService = drawingService;
    }

    @PostMapping(value = "/{username}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> saveDrawing(@PathVariable String username, @RequestBody String content) {
        try {
            drawingService.saveDrawing(username, content);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping(value = "/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getDrawing(@PathVariable String username) {
        try {
            String content = drawingService.getDrawing(username);
            return content != null ? ResponseEntity.ok(content) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
