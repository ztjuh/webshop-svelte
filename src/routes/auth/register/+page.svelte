<script lang="ts">
    import { goto } from '$app/navigation';
    import Fa from 'svelte-fa';
    import { 
        faUser,
        faUserPlus,
        faEnvelope,
        faLock,
        faSpinner,
        faCircleExclamation
    } from '@fortawesome/free-solid-svg-icons';
    
    let email = $state('');
    let password = $state('');
    let confirmPassword = $state('');
    let firstname = $state('');
    let lastname = $state('');
    let error = $state('');
    let loading = $state(false);
    
    async function handleSubmit(e: Event): Promise<void> {
        e.preventDefault();
        error = '';
        
        if (password !== confirmPassword) {
            error = 'Passwords do not match';
            return;
        }
        
        if (password.length < 6) {
            error = 'Password must be at least 6 characters';
            return;
        }
        
        loading = true;
        
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify({ email, password, firstname, lastname }),
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.ok) {
                goto('/auth/login');
            } else {
                const data = await response.json();
                error = data.message || 'Registration failed';
            }
        } catch (err) {
            error = 'An error occurred';
        } finally {
            loading = false;
        }
    }
</script>

<svelte:head>
    <title>Register - Faithful Shop</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-rose-400/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-4 border-black">
        <!-- Header -->
        <div class="text-center">
            <div class="mx-auto h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Fa icon={faUserPlus} class="text-white text-xl" />
            </div>
            <h2 class="mt-6 text-3xl font-extrabold text-white">
                Create Account
            </h2>
            <p class="mt-2 text-sm text-white/80">
                Join our faith-filled community today
            </p>
        </div>
        
        <!-- Error Message -->
        {#if error}
            <div class="bg-white/20 backdrop-blur-sm border-l-4 border-white p-4 rounded-lg">
                <div class="flex items-center">
                    <Fa icon={faCircleExclamation} class="text-white mr-3" />
                    <p class="text-sm text-white">{error}</p>
                </div>
            </div>
        {/if}
        
        <!-- Registration Form -->
        <form onsubmit={handleSubmit} class="mt-8 space-y-6">
            <div class="space-y-4">
                <!-- First Name & Last Name (2 columns) -->
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label for="firstname" class="block text-sm font-medium text-white/90 mb-1">
                            First Name
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Fa icon={faUser} class="text-white/50" />
                            </div>
                            <input 
                                id="firstname"
                                type="text" 
                                bind:value={firstname}
                                class="w-full pl-10 px-4 py-3 bg-black backdrop-blur-sm border-2 rounded-lg focus:ring-2 focus:ring-black focus:bg-black focus:border-black text-rose-400 placeholder-rose-400/50 transition-all duration-300"
                                placeholder="John"
                                required
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label for="lastname" class="block text-sm font-medium text-white/90 mb-1">
                            Last Name
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Fa icon={faUser} class="text-white/50" />
                            </div>
                            <input 
                                id="lastname"
                                type="text" 
                                bind:value={lastname}
                                class="w-full pl-10 px-4 py-3 bg-black backdrop-blur-sm border-2 rounded-lg focus:ring-2 focus:ring-black focus:bg-black focus:border-black text-rose-400 placeholder-rose-400/50 transition-all duration-300"
                                placeholder="Doe"
                                required
                            />
                        </div>
                    </div>
                </div>
                
                <!-- Email -->
                <div>
                    <label for="email" class="block text-sm font-medium text-white/90 mb-1">
                        Email Address
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Fa icon={faEnvelope} class="text-white/50" />
                        </div>
                        <input 
                            id="email"
                            type="email" 
                            bind:value={email}
                            class="w-full pl-10 px-4 py-3 bg-black backdrop-blur-sm border-2 rounded-lg focus:ring-2 focus:ring-black focus:bg-black focus:border-black text-rose-400 placeholder-rose-400/50 transition-all duration-300"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                </div>
                
                <!-- Password -->
                <div>
                    <label for="password" class="block text-sm font-medium text-white/90 mb-1">
                        Password
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Fa icon={faLock} class="text-white/50" />
                        </div>
                        <input 
                            id="password"
                            type="password" 
                            bind:value={password}
                            class="w-full pl-10 px-4 py-3 bg-black backdrop-blur-sm border-2 rounded-lg focus:ring-2 focus:ring-black focus:bg-black focus:border-black text-rose-400 placeholder-rose-400/50 transition-all duration-300"
                            placeholder="••••••••"
                            required
                            minlength="6"
                        />
                    </div>
                </div>
                
                <!-- Confirm Password -->
                <div>
                    <label for="confirmPassword" class="block text-sm font-medium text-white/90 mb-1">
                        Confirm Password
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Fa icon={faLock} class="text-white/50" />
                        </div>
                        <input 
                            id="confirmPassword"
                            type="password" 
                            bind:value={confirmPassword}
                            class="w-full pl-10 px-4 py-3 bg-black backdrop-blur-sm border-2 rounded-lg focus:ring-2 focus:ring-black focus:bg-black focus:border-black text-rose-400 placeholder-rose-400/50 transition-all duration-300"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>
            </div>

            <!-- Submit Button -->
            <button 
                type="submit" 
                class="w-full py-3 px-4 text-base font-semibold text-rose-600 bg-white hover:bg-black rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02] inline-flex items-center justify-center"
                disabled={loading}
            >
                {#if loading}
                    <Fa icon={faSpinner} class="mr-2 animate-spin" /> Creating Account...
                {:else}
                    <Fa icon={faUserPlus} class="mr-2" /> Create Account
                {/if}
            </button>
            
            <!-- ✅ Commented out empty hrefs -->
            <!-- 
            <div class="text-center text-sm text-white/60">
                <p>
                    By creating an account, you agree to our 
                    <a href="#" class="text-white/80 hover:text-white transition-colors">Terms</a> 
                    and 
                    <a href="#" class="text-white/80 hover:text-white transition-colors">Privacy Policy</a>
                </p>
            </div>
            -->
        </form>
        
        <!-- Footer -->
        <div class="mt-6 text-center">
            <p class="text-sm text-white/80">
                Already have an account? 
                <a href="/auth/login" class="font-medium text-white hover:text-white/80 transition-colors">
                    Sign in here
                </a>
            </p>
            <div class="mt-4 flex justify-center space-x-4 text-sm text-white/60">
                <span>✝️ Faithful Shop</span>
                <span>•</span>
                <span>John 3:16</span>
            </div>
        </div>
    </div>
</div>