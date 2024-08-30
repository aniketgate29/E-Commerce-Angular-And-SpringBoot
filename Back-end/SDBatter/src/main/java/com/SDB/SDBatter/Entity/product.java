package com.SDB.SDBatter.Entity;

import java.math.BigDecimal;
import java.math.BigInteger;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="tbl_product")
public class product {

	@Id
	@GeneratedValue( strategy =GenerationType.IDENTITY) 
	private int id;
	@JsonProperty
	private String name;
	@JsonProperty
    @Column(length = 50000 )
	private String image;
	
	@JsonProperty
	private BigDecimal price;
	
	@JsonProperty
	private String description ;
	
	@JsonProperty
	private String category;
	
	@JsonProperty
	private String verient;
	
	@JsonProperty
	private int quantity;
	@JsonProperty
	private int quantities;
	
	public int getQuantities() {
		return quantities;
	}
	public void setQuantities(int quantities) {
		this.quantities = quantities;
	}
	 public BigDecimal getPrice() {
	        return price;
	    }

	    public void setPrice(BigDecimal price) {
	        this.price = price;
	    }
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getVerient() {
		return verient;
	}
	public void setVerient(String verient) {
		this.verient = verient;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
	
	
	
	
}
