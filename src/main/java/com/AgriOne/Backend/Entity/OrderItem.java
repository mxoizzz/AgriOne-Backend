package com.AgriOne.Backend.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "order_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "crop_id", nullable = false)
    private Crop crop;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    private Integer quantity;

    private Double pricePerUnit;

    private Double totalPrice;

    @ManyToOne
    @JoinColumn(name = "farmer_id", nullable = false)
    private User farmer;
}
