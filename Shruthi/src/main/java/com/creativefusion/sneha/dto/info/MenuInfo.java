package com.creativefusion.sneha.dto.info;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenuInfo {
    private Long fid;
    private Long quantity;
}
