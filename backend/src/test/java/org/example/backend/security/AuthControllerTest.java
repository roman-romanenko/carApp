package org.example.backend.security;

import org.example.backend.user.User;
import org.example.backend.user.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oidcLogin;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Test
    @DisplayName("should return User")
    void getCurrentUser() throws Exception {
        User user = User.builder()
                .id("testUser")
                .username("testUser")
                .avatarUrl("https://avatars.githubusercontent.com")
                .build();

        userRepository.save(user);

        mockMvc.perform(get("/api/currentUser")
                        .with(oidcLogin().idToken(token -> token
                                .claim("sub", "testUser")
                        )))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                    {
                        "username": "testUser",
                        "avatarUrl": "https://avatars.githubusercontent.com"
                    }
                    """));
    }
}