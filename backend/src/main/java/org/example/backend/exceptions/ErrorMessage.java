package org.example.backend.exceptions;

import lombok.Builder;

@Builder
public record ErrorMessage(int errorCode, String errorMessage) {
}
