function rls_nonstationary(n, lambda, N, uniqueIdentifier)

    % n = 1000;  
    x = randn(n, 1); 
    d = sin(0.01 * (1:n)') + 0.5 * randn(n, 1); 
    % non-stationary signal  

    % RLS parameters  
    % lambda = 0.99;  
    % N = 4;  

    % Initialize variables 
    w = zeros(N, 1);  
    P = eye(N) * 1000; 
    y = zeros(n, 1); 
    e = zeros(n, 1); 
    w_hist = zeros(n, N); 

    % RLS algorithm  
    for i = N:n
        x_vec = x(i:-1:i-N+1);     
        pi = P * x_vec;     
        k = pi / (lambda + x_vec' * pi);   
        y(i) = w' * x_vec;    
        e(i) = d(i) - y(i);    
        w = w + k * e(i);     
        P = (P - k * x_vec' * P) / lambda;    
        w_hist(i, :) = w';  
    end  

    % Plot results  
    figure; 

    subplot(3, 1, 1); 
    plot(d, 'DisplayName', 'Desired signal');  
    hold on; 
    plot(y, 'DisplayName', 'RLS output'); 
    legend;  
    title('RLS Output vs Desired Signal'); 

    subplot(3, 1, 2); 
    plot(e, 'DisplayName', 'Error');  
    legend; 
    title('Error Signal');  

    subplot(3, 1, 3); 
    plot(vecnorm(w_hist, 2, 2), 'DisplayName', 'Norm of weight vector');  
    legend; 
    title('Norm of Weight Vector'); 

    % Adjust the spacing
    set(gcf, 'Position', [100, 100, 800, 1000]); % Increase the figure height
    h = findobj(gcf,'Type','axes'); % Get handles to all axes
    for i = 1:length(h)
        pos = get(h(i), 'Position');
        pos(2) = pos(2) - 0.05 * (i-1); % Adjust the y-position of each subplot
        pos(4) = pos(4) - 0.03; % Adjust the height of each subplot to add more space
        set(h(i), 'Position', pos);
    end

    saveas(gcf, sprintf('Outputs/rls_nonstationary_%s.png', uniqueIdentifier));
    close(gcf);

end