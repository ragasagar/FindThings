package com.sap.findthings.dto;

import com.sap.findthings.domain.ItemRepresentation;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * The type Item summary dto.
 */
@Setter
@Getter
public class ItemSummaryDto {

    private List<ItemRepresentation> items;
    private Integer shopId;
    private Double price;
}
